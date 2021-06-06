import authReducer from "../../reducers/auth";

test("should change state to {uid}", ()=>{
    const defState = {};
    const action = {
        type:"LOGIN",
        uid:"yupioh"
    };

    const state = authReducer(defState, action);
    expect(state).toEqual({uid:action.uid});
});
test("should clear uid from state", ()=>{
    const defState = {
        uid:"piripi"
    };
    const action = {
        type:"LOGOUT"
    };
    const state = authReducer(defState, action);
    expect(state).toEqual({});
});         