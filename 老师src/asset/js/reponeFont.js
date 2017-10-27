/*字体响应*/
export default{
    width:640,
    fontSize:625,
    fontAuto:function(){
        var winWidth=document.documentElement.clientWidth;
        if(winWidth>=this.width)
            document.documentElement.style.fontSize=this.fontSize+"%";
        else
            document.documentElement.style.fontSize=winWidth/this.width*this.fontSize+"%";
    },
    getElementViewTop:function(element){
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while(current !== null){
            actualTop += current. offsetTop;
            current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat")
            var elementScrollTop=document.body.scrollTop;
        else
            var elementScrollTop=document.documentElement.scrollTop;
        return actualTop-elementScrollTop;
    },
    resizeCallback:null,
    init:function(){
        this.fontAuto();
        var obj=this;
        window.addEventListener('resize',function(){
            obj.fontAuto();
            if(obj.resizeCallback)
                obj.resizeCallback();
        });
    }
};