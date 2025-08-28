export type Mode = 'All' | 'Pads' | 'Tampons';

export type DispenserStatus = 'available' | 'unavailable'

export class Dispenser {
    constructor(
        public id: string,
        public name: string,
        public latitude: number,
        public longitude: number,
        public pads: number,
        public tampons: number,
        public building: string,
        public updatedAt?: number,
    ) {}

    getStatus() {
        if (this.pads > 0 || this.tampons > 0) return 'Available';
        return 'Unavailable';
    }

    getPadsStatus() {
        if (this.pads > 0) return 'Available';
        return 'Unavailable';
    }

    getTamponsStatus() {
        if (this.tampons > 0) return 'Available';
        return 'Unavailable';
    }

    getColor(mode: 'All' | 'Pads' | 'Tampons') {

        if (mode !== 'All' && mode !== 'Pads' && mode !== 'Tampons') {
            throw new Error('Invalid mode');
        }

        if (mode === 'All') {
            if (this.pads > 0 || this.tampons > 0) return 'green';
            return 'red';
        }
        if (mode === 'Pads') {
            if (this.pads > 0) return 'green';
            return 'red';
        }

        if (mode === 'Tampons') {
            if (this.tampons > 0) return 'green';
            return 'red';
        }
    }

    distanceFrom(loco: {lat: number, lng: number}) {
        // haversine formula
        const toRad = (x: number) => (x * Math.PI) / 180;
        const R = 6371;
        const dLat = toRad(loco.lat - this.latitude);
        const dLon = toRad(loco.lng - this.longitude);
        const s1 = Math.sin(dLat / 2) ** 2;
        const s2 = Math.cos(toRad(this.latitude)) * Math.cos(toRad(loco.lat)) * Math.sin(dLon / 2) ** 2;
        return 2 * R * Math.asin(Math.sqrt(s1 + s2));
    }

  }
