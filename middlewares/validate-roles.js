import { request, response } from "express"



const isAdminRole = ( req = request, res = response, next ) => {


    if ( !req.currentUser ) {
        return res.status(500).json({
            msg: "Trying to validate route before validating jwt"
        })
    }

    const { rol, nombre } = req.currentUser;
    
    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } has not admin role, Can not do that`
        })
    }

    next();
}


const hasRole = ( ...roles ) => { // toma los N roles y los inserta en el array roles

    
    return ( req = request, res = response, next ) => {
        
        
        if ( !req.currentUser ) {
            return res.status(500).json({
                msg: "Trying to validate route before validating jwt"
            })
        }

        if ( !roles.includes( req.currentUser.rol ) ) {
            return res.status(401).json({
                msg: `user role must be one of: ${ roles }`
            });
        }

        next();
    }
}

export {
    isAdminRole,
    hasRole
}