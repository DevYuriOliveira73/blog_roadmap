import {Router} from 'express';
import {createUser} from "../controllers/user/create.js"


const router = Router()


router.route("/user")
  .post( createUser )
//   .get( getClientes )

// router.route("/cliente/:id")
//   .get( getClienteById )
//   .delete( deleteCliente )
//   .patch( updateCliente )

export default router