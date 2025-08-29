import { useEffect, useMemo, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { DetailsPane, Legend, SearchBar, SegmentedMode } from '../../utils/components';
import { Dispenser, Mode } from '../../utils/models';
import { HKU_SEED } from '../../utils/seed';
import { styles } from '../../utils/styles';

const MIT_LOCATION = { lat: 42.3601, lng: -71.0942 };
const HKU_LOCATION = { lat: 22.283089, lng: 114.131691};


export default function MapScreen() {
  const [mode, setMode] = useState<Mode>('All');
  //const [tab, setTab] = useState<'MAP' | 'LIST'>('MAP');
  const [query, setQuery] = useState('');
  const [dispensers, setDispensers] = useState<Dispenser[]>(HKU_SEED);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>(HKU_LOCATION);
  //const [hasLocPermission, setHasLocPermission] = useState<boolean | null>(null);


  // Simulate realtime updates
  useEffect(() => {
      const t = setInterval(() => {
          setDispensers((prev) => {
              const i = Math.floor(Math.random() * prev.length);
              const copy = [...prev];
              const d = copy[i];
              if (Math.random() < 0.5) d.pads = Math.max(0, d.pads + (Math.random() < 0.5 ? -1 : 1));
              else d.tampons = Math.max(0, d.tampons + (Math.random() < 0.5 ? -1 : 1));
              d.updatedAt = Date.now();
              copy[i] = d;
              return [...copy];
          });
          }, 10000);
      return () => clearInterval(t);
  }, []);


  const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      return dispensers
          .filter((d) => !q || d.name.toLowerCase().includes(q) || d.building.toLowerCase().includes(q))
          .map((d) => Object.assign(new Dispenser(d.id, d.name, d.latitude, d.longitude, d.pads, d.tampons, d.building, d.updatedAt), { distanceKm: d.distanceFrom(userLocation) }))
          .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }, [dispensers, query, userLocation]);


  const initialRegion = useMemo(() => ({
      latitude: userLocation.lat,
      longitude: userLocation.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
  }), [userLocation]);

  const [selected, setSelected] = useState<Dispenser | null>(null);


  const mapRef = useRef<MapView | null>(null);

  const onRowPress = (id: string) => {
      console.log('Go to detail for', id);
      };


  return (
      <View style={styles.container}>
          <Image source={require('../../assets/images/FlowBox-logo.png')} style={styles.logo} />
          <SegmentedMode value={mode} onChange={setMode} />

          <SearchBar value={query} onChange={setQuery} />
            <View style={[styles.mapWrap, {height: '45%'}]}>
                <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={initialRegion}
                    //showsUserLocation={!!hasLocPermission}
                    //showsMyLocationButton={!!hasLocPermission}
                >
                {filtered.map((d) => (
                <Marker
                    key={d.id}
                    coordinate={{ latitude: d.latitude, longitude: d.longitude }}
                    pinColor={d.getColor(mode)}
                    //title={d.name}
                    //description={`${d.getStatus()} · pads:${d.pads} · tampons:${d.tampons}`}
                    onPress={() => setSelected(d)}
                />
                ))}
                </MapView>
                <View style={styles.legendOverlay}>
                <Legend mode={mode} />
                </View>
          </View>

          <DetailsPane dispenser={selected} distanceKm={selected?.distanceFrom(userLocation)} />

      </View>
  );

  }
