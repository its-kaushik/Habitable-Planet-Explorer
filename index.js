import { parse } from 'csv-parse' ;
import { open } from 'fs/promises' ;

const habitablePlanetsList = [] ;

function isHabitable(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

const fs = await open('./kepler_data.csv') ;
const stream = fs.createReadStream()

    .pipe(parse({
        comment: '#',
        columns: true,
    }))

    .on( 'data', (planet) => {
        if( isHabitable(planet) )
            habitablePlanetsList.push(planet) ;
    } )

    .on('end', ()=> {
        
        console.log(habitablePlanetsList.map( (planet) => {
            return planet['kepler_name'] ;
        } ))

        console.log(`Found ${habitablePlanetsList.length} Habitable Planets `)
    })


