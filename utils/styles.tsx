import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.select({ ios: 54, android: 24, default: 24 }), paddingHorizontal: 16 },
    header: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
    segmented: { flexDirection: 'row', backgroundColor: '#f2f2f2', borderRadius: 12, padding: 4, marginBottom: 12 },
    segmentBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
    segmentBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 1 },
    segmentLabel: { fontWeight: '600', color: '#666' },
    segmentLabelActive: { color: '#111' },
    searchBar: { marginBottom: 12, borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
    searchInput: { fontSize: 16, color: '#111' },
    mapWrap: { flex: 0, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' },
    legendOverlay: { position: 'absolute', bottom: 12, left: 12, right: 12 },
    legendWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, backgroundColor: 'rgba(255,255,255,0.9)', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
    legendItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 },
    legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
    legendText: { fontSize: 12, color: '#333' },
    row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' },
    statusBadge: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
    rowTitle: { fontSize: 16, fontWeight: '600', color: '#111' },
    rowSub: { fontSize: 12, color: '#666', marginTop: 2 },
    rowChevron: { fontSize: 22, color: '#aaa', paddingHorizontal: 6 },
    empty: { textAlign: 'center', color: '#777', marginTop: 24 },
    logo: { width: 160, height: 40, marginTop: 10, marginLeft: 10, marginBottom: 10 },
    detailsPane: { flex: 1, backgroundColor: '#fff', padding: 16 },
    detailsTitle: { fontSize: 20, fontWeight: '600', color: '#111' },
    detailsSub: { fontSize: 12, color: '#666', marginTop: 2 },
    detailsText: { fontSize: 16, color: '#111', padding: 5},
    detailsChevron: { fontSize: 22, color: '#aaa', paddingHorizontal: 6 },
    detailsRow: { flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-around', marginTop: 8, borderWidth: 1, borderColor: '#eaeaea', borderRadius: 10, paddingVertical: 3, flex: 0 },
    detailsItem: { alignItems: 'center', fontSize: 30, padding: 5 },

    scanContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 64,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      width: '100%',
      paddingHorizontal: 64,
    },
    button: {
      flex: 1,
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.light.tint,
      marginBottom: 60,
    }
  });
