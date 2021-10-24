import React from 'react';
//설치한 스택 네비게이션 라이브러리를 가져옵니다
import { createStackNavigator } from '@react-navigation/stack';

//페이지로 만든 컴포넌트들을 불러옵니다
import Chatting from '../pages/ChattingPage';
import Allroom from '../pages/AllroomPage';
import Login from '../pages/LoginPage';
import My from '../pages/MyPage';
import MyRoom from '../pages/MyRoomPage';
import Notification from '../pages/NotificationPage';
import Profile from '../pages/ProfilePage';
import Register from '../pages/RegisterPage';
import SchoolRegister from '../pages/SchoolRegisterPage';
import Send from '../pages/SendPage';
//스택 네비게이션 라이브러리가 제공해주는 여러 기능이 담겨있는 객체를 사용합니다
//그래서 이렇게 항상 상단에 선언하고 시작하는게 규칙입니다!
const Stack = createStackNavigator();


const StackNavigator = () =>{
    return (

        //컴포넌트들을 페이지처럼 여기게끔 해주는 기능을 하는 네비게이터 태그를 선언합니다.
        //위에서 선언한 const Stack = createStackNavigator(); Stack 변수에 들어있는 태그를 꺼내 사용합니다.
        //Stack.Navigator 태그 내부엔 페이지(화면)를 스타일링 할 수 있는 다양한 옵션들이 담겨 있습니다.
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "white",
                    borderBottomColor: "#e5e5e5",
                    borderBottomWidth:1,
                    shadowColor: "white",
                    height:100
                },
                headerTintColor: "#000000",
                headerBackTitleVisible: false
            }}
            
        >

            {/* 컴포넌트를 페이지로 만들어주는 엘리먼트에 끼워 넣습니다. 이 자체로 이제 페이지 기능을 합니다*/}
            <Stack.Screen name="로그인" component={Login}/>
            <Stack.Screen name="회원가입" component={Register}/>
            <Stack.Screen name="학교등록" component={SchoolRegister}/>
            <Stack.Screen name="MY" component={My}/>
            <Stack.Screen name="내 방" component={MyRoom}/>
            <Stack.Screen name="프로필 수정" component={Profile}/>
            <Stack.Screen name="알림" component={Notification}/>
            <Stack.Screen name="쪽지함" component={Chatting}/>
            <Stack.Screen name="쪽지 보내기" component={Send}/>
            <Stack.Screen name="모든 방 보기" component={Allroom}/>
        </Stack.Navigator>
    )
}

export default StackNavigator;