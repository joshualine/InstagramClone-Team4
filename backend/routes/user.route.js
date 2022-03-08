const {
  authUser,
  getUserProfile,

  getUsers,
  registerUser,
  getUserById,
} = require('../controllers/user.controller');
const router = require("express").Router();
const { protected } = require('../middlewares/auth.middleware');

//---------------------------------------------------------------------------

router.route('/')
  .get(protected, getUsers) //Get All Users
  .post(registerUser); //Add User

router
  .post('/login', authUser)

//---------------------------------------------------------------------------
router
  .route('/profile')
  .get(protected, getUserProfile) //Get user profile

//---------------------------------------------------------------------------
router
  .route('/:id')
  .get(protected, getUserById) //Get One User 

//--------------------------------------------------------------------------


module.exports = router;