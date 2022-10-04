import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { GeoJSON } from "geojson";

@Entity('metaData')
export class Parcel {
    
        @PrimaryGeneratedColumn()
        id: number
        // @Column({ nullable: true })
        // type: string;
        @Column({ nullable: true })
        name: string
        @Column({ nullable: true })
        color: string
        @Column({ nullable: true })
        desc: string
        // @Column({ nullable: true, type: "json" })
        // properties: any
        @Column({
            type: 'geometry',
            //name: 'geom',
            spatialFeatureType: 'geometry',
            srid: 4326,
            nullable: true
        })
        geom: GeoJSON;
        // @IsOptional()
        // geometry?: number[][];
    }