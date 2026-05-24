import {Router} from 'express';
import {singUpUser} from "../controllers/user/signUp.js"


const router = Router()


router.route("/user")
  .post( singUpUser )
//   .get( getClientes )

// router.route("/cliente/:id")
//   .get( getClienteById )
//   .delete( deleteCliente )
//   .patch( updateCliente )

export default router