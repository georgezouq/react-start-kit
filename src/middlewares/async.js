export default function () {

    return next => action => {


        if ( !action || !action.payload || !action.payload.then) {
            return next(action);
        }

        next({...action, status: "start"});

        action.payload.then(function (response) {

            next({...action, status: "success", payload: response});

        }).catch(function (e) {

            next({...action, status: "failed", payload: e});

        });
    }
}