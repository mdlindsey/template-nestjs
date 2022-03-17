import * as JWT from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_LIFESPAN = '30d'

export type SignedJWT<T> = string
export const signJwt = <T>(payload:any):SignedJWT<T> => 
    JWT.sign({ ...payload }, JWT_SECRET, { expiresIn: JWT_LIFESPAN })
export const verifyJwt = <T>(jwt:string, secret:string=JWT_SECRET):T => {
    try {
        JWT.verify(jwt, secret)
        return JWT.decode(jwt) as T
    } catch(e) {
        return null
    }
}
