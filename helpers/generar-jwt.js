import jwt from "jsonwebtoken";



const generarJWT = ( uid = '' ) => {



    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
             
            if( err ) {
                console.error(err);
                reject('It was not possible to create JWT')
            } else {
                resolve( token );
            }
        });

    })
}


export {
    generarJWT
}