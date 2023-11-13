import JudgesService from "../services/judges.js"

function getJudges(req, res) {

    JudgesService.getJudges(req.query)
    .then(function (judges) {
      res.status(200).json(judges)
    })
}


function getJudgeById(req, res) {

  const { idJudge } = req.params

  JudgesService.getJudgeById(idJudge)
    .then(function (judge) {
      return res.status(200).json(judge)
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg })
      }
      else {
        res.status(500).json({ msg: "No se pudo guardar en el archivo" })
      }
    })
}


async function updateJudge(req, res) {

  const { idJudge } = req.params

  return JudgesService.updateGame(req.body, idJudge)
  .then(function (judge) {
    return res.status(200).json(judge)
  })
  .catch(function (err) {
    if (err?.code) {
      res.status(err.code).json({ msg: err.msg })
    }
    else {
      res.status(500).json({ msg: "No se pudo guardar en el archivo" })
    }
  })

}


//? Exportar resto de funciones
export {
  getJudges,
  getJudgeById,
  updateJudge
}

export default {
    getJudges,
    getJudgeById,
    updateJudge
}