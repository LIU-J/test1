const store = {
	app:{//app整体相关功能：侧滑
		state:{//状态，数据
			appX:0,
			appBarX:285/100
		},
		mutations:{//变更，函数
			appMove(state,payload){//state状态数据;payload得到值json类型
                if(payload.bool){
                   state.appX=state.appBarX;
                   state.appBarX=0;
                }
                else{
                    
                    state.appBarX=state.appX;
                  	state.appX=0;
                }
            }
		},
		actions:{//动作，函数
			appMove(context,json){//第二参数json是传过来的对象json
		      	context.commit('appMove',json);//commit提交appMove函数，其他模块如果有同名的也会触发，所以注意命名
		    }
		}
	},
	prompt:{//弹框提示功能
		state:{
			promptJson:{
				icoBool:true,//图标是否显示
				content:"",//提示内容 
				showOrHide:false//是否显示提示框
			}
		},
		mutations:{//变更，函数
			promptState(state,payload){//state状态数据;payload得到值json类型
				if(payload.showOrHide==false)
				{
					state.promptJson.icoBool=payload.icoBool;
					state.promptJson.content=payload.content;
					window.setTimeout(function(){
						state.promptJson.showOrHide=payload.showOrHide;
					},500);
				}
				else
				{
                	state.promptJson=payload;
                }
            }
		},
		actions:{//动作，函数，触发其他store用commit

		}
	},
	refreshMore:{//刷新加载功能
		state:{
			list:{//列表数据
				title:"",
				data:[]
			}
		},
		mutations:{//变更，函数
			refreshMoreUpdate(state,payload){//state状态数据;payload得到值json类型
				if(payload.msg=="刷新")
				{
					state.list=payload.data;
				}
				else{
					state.list.data=state.list.data.concat(payload.data.data)
				}
            }
		},
		actions:{//动作，函数，触发其他store用commit

		}
	}
};

export default store;