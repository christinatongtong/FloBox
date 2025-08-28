import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dispenser } from '../utils/models';
import { styles } from '../utils/styles';

type Mode = 'All' | 'Pads' | 'Tampons';

export function SegmentedMode({ value, onChange }: { value: Mode; onChange: (v: Mode) => void }) {
    const opts: Mode[] = ['All', 'Pads', 'Tampons'];
    return (
      <View style={styles.segmented}>
        {opts.map((opt) => (
          <TouchableOpacity key={opt} style={[styles.segmentBtn, value === opt && styles.segmentBtnActive]} onPress={() => onChange(opt)}>
            <Text style={[styles.segmentLabel, value === opt && styles.segmentLabelActive]}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }


  export function Legend({ mode }: { mode: Mode }) {
    const label =
      mode === 'All' ? 'Has pads or tampons'
      : mode === 'Pads' ? 'Has pads'
      : 'Has tampons';

    return (
      <View style={styles.legendWrap}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: 'green' }]} />
          <Text style={styles.legendText}>Available · {label}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: 'red' }]} />
          <Text style={styles.legendText}>Unavailable</Text>
        </View>
      </View>
    );
  }


  export function SearchBar({ value, onChange }: { value: string; onChange: (t: string) => void }) {
    return (
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search building name"
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChange}
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>
    );
  }

  export function ListRow({ item, onPress, mode }: { item: Dispenser & { distanceKm?: number }; onPress: (id: string) => void; mode: Mode }) {
    const availability = mode === 'All' ? item.getStatus() : (mode === 'Pads' ? item.getPadsStatus() : item.getTamponsStatus());
    return (
      <TouchableOpacity style={styles.row} onPress={() => onPress(item.id)}>
        <View style={[styles.statusBadge, { backgroundColor: item.getColor(mode) }]} />
        <View style={{ flex: 1 }}>
          <Text style={styles.rowTitle}>{item.name}</Text>
          <Text style={styles.rowSub}>
            {item.building ?? '—'} · {availability} · {item.pads} pads · {item.tampons} tampons · {item.distanceKm?.toFixed(2)} km</Text>
        </View>
        <Text style={styles.rowChevron}>›</Text>
      </TouchableOpacity>
    );
  }
