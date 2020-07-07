import React from "react";
import { Map as LeafLetMap, Circle, TileLayer } from 'react-leaflet';

const TILE_URL =
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';

const CONFIG = {
    center: [35, -30],
    maxBounds: [
        [-90, -180],
        [90, 180]
    ],
    zoom: 3
};

function CovidMap({ data, color }) {
    return (
        <LeafLetMap className="h-100 w-100" {...CONFIG}>
            <TileLayer url={TILE_URL} />
            {data.map(({ lat, long, number, name }) => (
                <Circle key={name} center={[lat, long]} radius={number} color={color} />
            ))}
        </LeafLetMap>
    );
}

export default CovidMap;
