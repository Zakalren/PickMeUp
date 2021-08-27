import express from 'express'

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const ua = req.header('user-agent');

  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
    return res.render('mobile/index', { user: req.user, basket: req.user ? req.user.basket : [], });
  } else {
    return res.render('index', { user: req.user, basket: req.user ? req.user.shopping_basket : [], });
  }
});

export default router;
