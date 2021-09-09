const navi_btn = document.querySelectorAll(".navi_btn");
const navi_list = document.querySelectorAll(".navi_list");
const inner_slide = document.querySelectorAll(".inner_slide");
const slide_img = document.querySelectorAll(".slide_img");
const menuMo = document.querySelector(".menuMo");
const menu_con = document.querySelector(".menu_con");
const menu_close = document.querySelector(".menu_close");

let num = 0;
let imgTop = 0;
let isScroll = false;
let footer_num = -1;

for(let btn of navi_btn){
    btn.addEventListener("click", (e)=>{
        e.preventDefault(); 
        
        let target = e.currentTarget.getAttribute("href");

        for(let el of inner_slide){
            el.classList.remove("active");
        };

        document.querySelector(target).classList.add("active");

        for(let i=0; i<navi_btn.length; i++){
            navi_btn[i].parentNode.classList.remove("on");
        };
        e.currentTarget.parentNode.classList.add("on");
    });
};

for(let i=0; i<navi_btn.length; i++){
    (function(idx){
        navi_btn[idx].onclick = function(){
            for(let el of slide_img){
                el.style.top = `calc(100% * ${-idx})` 
                num = idx;
                console.log(num);
                if(num == 3){footer_num = 0;};
                console.log(footer_num);
            };
        };

    })(i)
};

for(let el of slide_img){
    imgTop++;
    
    el.style.transform = `translateY(calc(100% * ${imgTop -1}))`;
    el.style.top = '0px';
};

menuMo.addEventListener("click", (e)=>{
    e.preventDefault();
    menu_con.classList.add("on");
});

menu_close.addEventListener("click", (e)=>{
    e.preventDefault();
    menu_con.classList.remove("on");
});
let y = 0;

window.addEventListener("mousewheel", (e)=>{
    let wheel = e.deltaY;
    let isOn = document.querySelector(".menu_con").classList.contains("on");
    if(isOn) return;
    if(isScroll) return;

    if(wheel < 0){
        wheelDown();
        isScroll = true;
    } else {
        wheelUp();
        isScroll = true;
    }
});

document.querySelector("#footer").addEventListener("mousewheel", (e)=>{
    let wheel = e.deltaY;
    if(wheel < 0){document.querySelector("#footer").classList.remove("on");};
})

function wheelUp(){
    // (num == inner_slide.length -1) ? num = inner_slide.length -1 : num++;

    if(num == inner_slide.length -1){
        num = inner_slide.length -1;
    } else{
        num++;
    };

    for(let el of navi_list){el.classList.remove("on");};
    for(let el of inner_slide){el.classList.remove("active");};
    if(num == 3){
        
        if(footer_num <= 0) {footer_num++ };
        if(footer_num == 1){
            document.querySelector("#footer").classList.add("on");
            footer_num = 1;
        }
    };

    navi_list[num].classList.add("on");
    inner_slide[num].classList.add("active");

    setTimeout(()=>{
        isScroll = false;
    }, 700);  

    for(let el of slide_img){
        el.style.top = `calc(100% * ${-num})` 
    };
};

function wheelDown(){
    // (num == 0) ? num = 0 : num--;

    if(num == 0){
        num = 0;
    } else if(num <= 3){
        num--;
        if(footer_num == 1){
            footer_num = -1;
            num = 3;
        };
        
    };

    for(let el of navi_list){el.classList.remove("on");};
    for(let el of inner_slide){el.classList.remove("active");};

    navi_list[num].classList.add("on");
    inner_slide[num].classList.add("active");

    setTimeout(()=>{
        isScroll = false;
    }, 700);  

    for(let el of slide_img){
        el.style.top = `calc(100% * ${-num})`;
    };
};


