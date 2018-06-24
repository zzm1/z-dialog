;(function($) {
    // body...
    var Dialog = function(config){
        var _this = this;
        this.config = {
            type:'loading',
            message:null,
            buttons:null,
            delay:null,
            width:'auto',
            height:'auto',
            opacity:null,
            effect:false,
            delayCb:null,
            maskClose:false
        }
        //
        config && $.isPlainObject(config)?$.extend(this.config,config):this.isConfig=true;
        console.log(this.config);
        //创建dom
        this.body = $('body');
        this.mask = $('<div class="z-dialog-container">');
        this.win = $('<div class="dialog-window">');
        this.winHeader = $('<div class="dialog-header"></div>');
        this.winContent = $('<div class="dialog-content"></div>');
        this.winFooter = $('<div class="dialog-footer"></div>');
        this.create();
    }
    Dialog.zIndex = 10000;
    Dialog.prototype = {
        animate(){
            let _this = this;
            this.win.css("-webkit-transform","scale(0,0)");
            setTimeout(()=>{
                this.win.css("-webkit-transform","scale(1,1)");

            },100)
        },
        create(){
            var _this = this,config = this.config,mask = this.mask,win=this.win,header = this.winHeader,content = this.winContent,footer = this.winFooter,body = this.body,isConfig=this.isConfig;
            Dialog.zIndex++;
            mask.css('zIndex',Dialog.zIndex);
            if(isConfig){
                win.append(header.addClass('loading'));


                mask.append(win);
                body.append(mask);
                console.log(body);
            }else{
                win.append(header.addClass(config.type));
                config.message?win.append(content.html(config.message)):null;
                if(config.buttons){
                    this.createButtons(footer,config.buttons);
                    win.append(footer);
                }
                if(config.delay){
                    setTimeout(()=>{
                        config.delayCb&&config.delayCb();
                        this.close();
                    },config.delay)
                }
                if(config.opacity){
                    mask.css('backgroundColor',`rgba(0,0,0,${config.opacity}`)
                }
                if(config.width!='auto'){
                    win.width(config.width)
                }
                if(config.height!='auto'){
                    win.height(config.height)
                }
                if(config.effect){
                    this.animate()
                }
                if(config.maskClose){
                    mask.tap(()=>{
                        this.close();
                    })
                }
                mask.append(win);
                body.append(mask);
            }

        },
        close(){
            // console.log('close')
            this.mask.remove();
        },
        createButtons(footer,buttons){
            console.log(buttons);
            let _this = this;
            $(buttons).each(function(){
                console.log(this)
                let {type='',text='按钮',callback} = this;
                let button = $(`<button class=${type}>${text}</button>`);
                if(callback){
                    button.tap(function(e){
                        e.stopPropagation();
                        var isClose = callback();
                        if(isClose!=false){
                            _this.close();
                        }
                    })
                }else{
                    button.tap((e)=>{
                        e.stopPropagation();
                        _this.close();
                    })
                }
                footer.append(button);
                // let type = this.type;
                // let text = this.text;
                // let cb = this.callback;
            })

        }
    }
    window.Dialog = Dialog;
    $.dialog = function(config){
        return new Dialog(config)
    }
})(Zepto)
