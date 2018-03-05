const express = require('express')
const Sequelize = require('sequelize')
const { Dep, User } = require('../models')
const eventproxy = require('eventproxy')

const router = express.Router()

router.get('/', (req, res) => {
  const {
    depId = null,
    depName = null
  } = req.query;

  const queryConditions = {
    companyId: 1
  }
  if (depName) {
    queryConditions.depName = depName
  }
  if (depId) {
    queryConditions.depId = depId
  }
  Dep.findAll({
    where: queryConditions,
    attributes: ['depName', 'depId'],
  }).then((d) => {
    res.send({
      code: 0,
      data: JSON.parse(JSON.stringify(d))
    })
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/:depId', (req, res) => {
  const { depId } = req.params
  Dep.findAll({
    where: {
      depId
    },
  }).then((d) => {
    res.send({
      code: 0,
      data: JSON.parse(JSON.stringify(d[0]))
    })
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  console.log(req.params, body)
  Dep.upsert({
    depName: body.depName,
    depOwnerId: body.depOwnerId || null,
    depParentId: body.depParentId || null,
    companyId: 1,
  }).then((d) => {
    res.send({
      code: 0,
      data: d
    })
  }).catch((err) => {
    console.log(err);
  });
});

router.put('/', (req, res) => {
  const body = req.body;
  console.log(req.params, body)
  Dep.update({
    depName: body.depName,
    depOwnerId: body.depOwnerId || null,
    depParentId: body.depParentId || null,
  }, {
    where: { depId: body.depId },
    plain: true
  }).then((d) => {
    res.send({
      code: 0,
      data: d
    })
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/child/:depId', (req, res) => {
  const ep = new eventproxy();
  // 获取部门成员
  ep.on('getChildUser', (dep) => {
    console.log('in child', dep)
    User.findAll({
      where: {
        depId: dep.depId
      },
    }).then((d) => {
      if (d.length > 0) {
        res.send({
          code: 0,
          data: {
            owner: dep,
            user: JSON.parse(JSON.stringify(d)).filter(d => d.userId !== dep.user.userId)
          }
        })
      } else {
        ep.emit('getChildUser', dep);
      }
    }).catch((err) => {
      console.log(err);
    });
  });
  // 获取子部门
  ep.on('getChildDep', (dep) => {
    Dep.findAll({
      where: {
        depParentId: dep.depId
      },
    }).then((d) => {
      if (d.length > 0) {
        res.send({
          code: 0,
          data: {
            owner: dep,
            child: JSON.parse(JSON.stringify(d))
          }
        })
      } else {
        ep.emit('getChildUser', dep);
      }
    }).catch((err) => {
      console.log(err);
    });
  });
  // 获取部门详情
  const { depId } = req.params
  Dep.findAll({
    attributes: ['depName', 'depId'],
    where: {
      depId
    },
    include: [{
      model: User,
      attributes: ['userName', 'userId', 'userAvatar'],
      where: { depOwnerId: Sequelize.col('user.userId') }
    }]
  }).then((d) => {
    ep.emit('getChildDep', JSON.parse(JSON.stringify(d[0])));
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router
