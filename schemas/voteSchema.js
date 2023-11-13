import yup from 'yup'
import servicesGames from '../services/games.js';


export const voteCreateSchema = yup.object({
    jugabilidad: yup.number()
        .min(1, 'El voto debe ser mayor a 0')
        .max(10, 'El voto debe ser menor o igual a 10')
        .required('Debes votar la jugabilidad'),

    arte: yup.number()
        .min(1, 'El voto debe ser mayor a 0')
        .max(10, 'El voto debe ser menor o igual a 10')
        .required('Debes votar el arte'),

    sonido: yup.number()
        .min(1, 'El voto debe ser mayor a 0')
        .max(10, 'El voto debe ser menor o igual a 10')
        .required('Debes votar el sonido'),

    afinidadALaTematica: yup.number()
        .min(1, 'El voto debe ser mayor a 0')
        .max(10, 'El voto debe ser menor o igual a 10')
        .required('Debes votar la afinidad a la tematica'),

    game_id: yup.string()
        .required('Debes poner el id del juego a votar')
        .test({
            test: function(id) {
                const game = servicesGames.getGameById(id);

                let message = 'El juego no existe'
                if(game){
                    return game;

                } else {
                    throw new yup.ValidationError(message);

                }
            },
        }),

})
