import axios from 'axios'

const instance = axios.create({
    baseURL: "",

})


instance.interceptors.response.use(
    (response) => { return response;},
    async (error) => {
        const {
            config,
            response:{status},
        } = error;
        if(error.response.data.message === "TokenExpiresError"){
            const originalRequest = config;
        }
        }

    )

instance.interceptors.request.use(

)