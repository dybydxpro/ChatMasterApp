import http from "./http-common";

class Service {
    //Auth
    Login(data){
        return http.post("/login", data);
    }

    Register(data){
        return http.post("/register", data);
    }
}

export default new Service();