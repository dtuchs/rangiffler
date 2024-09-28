import {FC} from 'react';
import SvgWorldMap from 'react-svg-worldmap';
import "./styles.css";

type WorldMapData = {
    country: {
        code: string,
    },
    count: number,
}

interface WorldMapInterface {
    data: WorldMapData[],
}

export const WorldMap: FC<WorldMapInterface> = ({data = []}) => {
    const mapData = data.map((v) => ({
        country: v.country.code,
        value: v.count,
    }));

    return (
        <SvgWorldMap
            color="#174536"
            value-suffix="people"
            size="xl"
            data={mapData}
            richInteraction={true}
        />
    );
}
