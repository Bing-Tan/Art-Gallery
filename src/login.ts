const express = require('express');
const router = express.Router();
import { Context } from 'vm';
import  {getManager}  from "typeorm";
const http = require('http');
const  Acer  = "./entity/Acer";

export default async (ctx:Context, next:any) => {
    const { userNum, userPwd, cookie } = ctx.request.body;
    const userRepository = getManager().getRepository(Acer);
    const saveUsers = await userRepository.findOne({ where: { userNum: userNum }});
    const data = { isLogin: false, interviewer: null };

    if ((!saveUsers || !saveUsers.cypher) && !cookie) {
        ctx.body = new router(200, '你还未注册，请先注册', data);
    } else if (saveUsers && !cookie) {
        if (userPwd === saveUsers.userPwd) {
            // 设置20位数的 session 随机数，同时和查找到的用户信息一并存进数据库中
            const session = router(20)
            saveUsers.session = session;
            await userRepository.save(saveUsers)
            // 设置cookie
            ctx.cookies.set(
                'session', session, { httpOnly: false, maxAge: 1296000000 }
            )

            data.isLogin = true;
            data.interviewer = saveUsers.interviewer;
            ctx.body = new router(200, '登录成功', data);
        } else {
            ctx.body = new router(200, '账号或密码输入错误', data);
        }
    } else if (!saveUsers && cookie) {
        const findCookieUser = await userRepository.findOne({ where: { session: cookie }});
        const identity = findCookieUser.interviewer;
        if (findCookieUser) {
            data.isLogin = true;
            data.interviewer = identity;
            ctx.body = new router(200, '你已处于登录状态', data);
        }
    }
}