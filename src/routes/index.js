import { Router } from "express";

const routerAPI = (app) => {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/', (req, res) => {
    res.json({ msg: "Welcome" });
  });
};

export default routerAPI;
