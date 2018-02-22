import api from './http.js'
export default {
    userLogin(params) {
        return api.post('/login', params).then(res => res.data)
    },
    userRegister(params) {
        return api.post('/register', params).then(res => res.data)
    },
    findAllCourse(params) {
        return api.post('/course/findAllCourseIspublish',params).then(res => res.data)
    }
}