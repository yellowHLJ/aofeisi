<template>
    <div class="login-wrap">
        <div class="ms-title">奥菲斯后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm" status-icon>
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 请正确输入用户名和密码。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            var validateAccount = (rules, value, callback) => {
                if (value === '')  {
                    this.$message({showClose: true,message: '警告哦，您的账号是空的',type: 'warning'});
                    callback(new Error('请输入用户名'));
                } else {
                    if (this.ruleForm.username !== '') {
                        this.ruleForm.username = value;
                        this.validateCorrect();
                    }
                    callback();
                }
            }; 
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur',validator: validateAccount}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                allowLogin: true
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid && this.ruleForm.username == 'aofeisi' && this.ruleForm.password == '123456') {
                        localStorage.setItem('ms_username',this.ruleForm.username);
                        this.$router.push('/');
                    } else {
                        console.log('error submit!!');
                        this.$message({showClose: true,message: '警告哦，您账号或者密码错误请重新输入',type: 'warning'});
                        this.ruleForm.password = '';
                        this.ruleForm.username = '';
                        return false;
                    }
                });
            },
            validateCorrect(){
                if(this.ruleForm.password.trim().length > 0 && this.ruleForm.username.trim().length > 0){
                    this.allowLogin = false;
                } else {
                    this.allowLogin = true;
                }
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>