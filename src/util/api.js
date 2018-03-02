import api from './http.js'
export default {
    userLogin(params) {
        return api.post('/login', params).then(res => res.data)
    },
    userRegister(params) {
        return api.post('/register', params).then(res => res.data)
    },
    // 获取所有已发布的课程
    findAllCourse(params) {
        return api.post('/course/findAllCourseIspublish', params).then(res => res.data)
    },
    // 获取课程通过课程ID
    getCourseById(params) {
        return api.post('/course/findCourseByParams', params).then(res => res.data)
    },
    // 获取资源
    findAllResources(params) {
        return api.post('/course/findallresource', params).then(res => res.data)
    },
    // 查找在线测试通过课程ID
    findOnlineTest(params) {
        return api.post('/onlineTest/findAllonlineTest', params).then(res => res.data)
    },
    // 查找在线测试通过ID
    getOnlineTesById(params) {
        return api.post('/onlineTest/getOnlineTestById', params).then(res => res.data)
    },
    // 查找视频资源通过ID
    getVideoById(params) {
        return api.post('/video/findVideo', params).then(res => res.data);
    },
    // 添加评论
    addComment(params) {
        return api.post('/comment/addComment', params).then(res => res.data);
    },
    // 查找评论
    findAllComment(params) {
        return api.post('/comment/findAllComment', params).then(res => res.data);
    },
    // 获取用户信息
    getUserById(params) {
        return api.post('/user/getUserInformation', params).then(res => res.data);
    },
    //获取上传token
    getUploadToken(params) {
        return api.post('/uploadtoken', params).then(res => res.data);
    },
    // 修改用户信息
    modifyUser(params) {
        return api.post('/user/updateUserInformation', params).then(res => res.data);
    },
    // 获取实验资料通过ID
    getExperimentById(params) {
        return api.post('/experiment/getExperimentById', params).then(res => res.data);
    },
    // 获取习题作业通过ID
    getHomeworkById(params) {
        return api.post('/homowerk/getHomeworkById', params).then(res => res.data);
    },
    // 获取模拟试题通过ID
    getTestById(params) {
        return api.post('/test/getTestById', params).then(res => res.data);
    },
    // 添加收藏
    collectionCourse(params) {
        return api.post('/user/favoriteCourse', params).then(res => res.data);
    },
    // 取消收藏
    cancelCollectionCourse(params) {
        return api.post('/user/unfavoriteCourse', params).then(res => res.data);
    },
    // 删除评论
    deleteComment(params) {
        return api.post('/comment/deleteComment', params).then(res => res.data);
    },
    // 分页查找课程
    getCourseByPage(params) {
        return api.post('/course/getCourseSpecial', params).then(res => res.data);
    },
    // 分页查找评价
    getCommentSpecial(params) {
        return api.post('/comment/getCommentSpecial', params).then(res => res.data);
    }
}