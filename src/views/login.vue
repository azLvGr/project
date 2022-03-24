<template>
  <el-divider class="login_div">
    <div class="login">
       <el-form :model="formLogin">
                <el-form-item>
                    <h2 class="title">实战项目</h2>
                </el-form-item>
                <div v-show="!ShowMailDiv">
                    <el-form-item >
                        <el-input v-model="formLogin.loginName" placeholder="账号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formLogin.password" placeholder="密码" show-password></el-input>
                     </el-form-item>
                </div>
                <div v-show="ShowMailDiv">
                    <el-row>
                    <el-col :span="18">
                            <el-form-item   label=""  prop="email" 
                             :rules="[
                             { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                             { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                                ]"
                            >
                                <el-input  type="text"  v-model='formLogin.email'  auto-complete="off" placeholder="邮箱地址"></el-input>
                            </el-form-item>
                     </el-col>
                    <el-col :span="6"><el-form-item class='btn'>
                    <el-button type="primary" style="width:120px"  @click="sendMail"  :loading="BtStatus" :disabled="disabled=!show">
                    <span v-show="show">发送验证码</span>
                    <span v-show="!show" class="count">{{count}}s</span>
                    </el-button></el-form-item></el-col>
                    </el-row>
                    <el-form-item>
                        <el-input v-model="formLogin.MailCode" placeholder="验证码"></el-input>
                     </el-form-item>
                </div>
                <el-form-item>
                    
                    <el-button type="primary" @click="login">登陆</el-button>
                    <div class="tips"  style="float:left;">  
                                   <a href="#" @click="retrievePWD">还没有账号？请注册</a>
                     <!-- <el-link  type="primary" @click='retrievePWD'>忘记密码</el-link> -->
                     </div>
                     <div class="tips"  style="float:right;">         
                    <el-link  icon="el-icon-edit" type='primary' @click="changeModel">{{MessageForChange}}</el-link> </div><br>
                </el-form-item>
                <span v-show="this.errorInfo.isShowError" class='error'>
                        {{this.errorInfo.text}}
                </span>
            </el-form>
    </div>
  </el-divider>
</template>


<style lang="scss">
$input_width:300px;
.login_div{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f8dc5ffc645c11013ee04d29abf6.png%403000w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648905749&t=f7abd7050e94c2afefbd359cb692f8d6');
    .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
     }
    .el-col {
    border-radius: 4px;
    }
    .login {
        width: 582px;
        height: 356px;
        margin-top: -356px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        opacity: 0.95;
        background-color: #ffffff;
        .title {
            text-align: center;
            color: #505458;
        }
        .el-form-item__content {
            width: $input_width;
        }
        .el-button {
            width: $input_width;
        }
        .el-form {
            margin: 30px 80px auto 80px;
            .error {
                display: block;
                text-align: center;
                color: red;
            }
        }
    }
}
:root {
  --el-color-primary: #409eff;
  --el-color-success: #67c23a;
  --el-color-warning: #e6a23c;
  --el-color-danger: #f56c6c;
  --el-color-error: #f56c6c;
  --el-color-info: #909399;
}
</style>
<script>
import apis from '../apis/apis';
export default {
    name: 'login',
    data() {
        return {
            count:90,
            MessageForChange:'切换邮箱登录',
            show:true,
            BtStatus:false,
            ShowMailDiv:false,
            formLogin:{
                    loginName: '',
                    password: '',
                    email:'',
                    MailCode:''
            },
            errorInfo: {
                text: '登陆失败,请重试',
                isShowError: false //显示错误提示
            }

        }
    },
    mounted() {
        document.onkeydown = (event) => {
            // var router=this.$route.path;
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13&&this.$route.path=='/login') { // enter 键 
                this.login();
            }
        };
        //  var loginLog = {
        //         ip: returnCitySN["cip"],
        //         city: returnCitySN["cname"] + '-' + '进入首页'
        //     };

        //     apis.shiroApi.loginLog(loginLog);
    },
    methods: {
        login() {
            //调用后端登陆接口
            apis.userApi.login(this.ShowMailDiv,this.formLogin)
                .then((data) => {

                    console.log('success:', data);
                    if (data && data.data) {
                        var json = data.data;
                        if( json.status == 'SUCCESS') {
                            this.$common.setSessionStorage('token', json.token);
                            this.$common.setSessionStorage('username',json.user.userName);
                            this.$common.setSessionStorage('userID',json.user.userID);
                            this.$common.setSessionStorage('userImgUrl',json.user.imgUrl);
                            this.$router.replace({ path: "/index" }); 
                                                     
                            // var loginLog={
                            //     ip:returnCitySN["cip"],
                            //     city:returnCitySN["cname"]+'-'+json.userName+'-登陆'
                            // };                            
                            // apis.shiroApi.loginLog(loginLog);
                            return;
                        }
                        else if (json.message) {
                            this.$message.error('json.message');
                        }
                    }
                    this.errorInfo.isShowError = true;
                    // this.$store.dispatch("loginLog",loginLog);
                })
                .catch((err) => {
                    console.log('error:', err);
                    this.errorInfo.isShowError = true;
                    this.errorInfo.text = '系统接口异常';
                });

        },
         retrievePWD() {
                this.$router.push({ path: '/retrievePassword' })
        },
        changeModel() {
            if(this.ShowMailDiv){
                this.ShowMailDiv=false;
                this.MessageForChange='切换邮箱登录';

            }else{
                this.ShowMailDiv=true;
                this.MessageForChange='切换账号密码登录';
            }       
        }, 
        sendMail(){
            if(this.formLogin.email==""){
            alert("请先输入邮箱地址");
             }else{
             this.BtStatus = true;
            apis.userApi.sendEMail(this.formLogin.email)
            .then((data)=>{
            console.log('success:', data);
             if (data && data.data) {
            var json = data.data;
            if( json.status == 'SUCCESS') {
               const TIME_COUNT = 90; //更改倒计时时间
               this.BtStatus = false;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer); // 清除定时器
                            this.timer = null;
                        }
                    }, 1000);
                }
            }else{
              this.show = true;
              this.BtStatus = false;
              alert(json.message);
            }
         }
        })
      }
    }
        
    }
}
</script>

