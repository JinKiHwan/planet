MotionPathPlugin.convertToPath('#orangePath');
MotionPathPlugin.convertToPath('#greenPath');

const pathLine = document.querySelector('#pathLine2');
const svg = document.querySelector('svg');
const planet2 = document.querySelector('#planet2');
const planet3 = document.querySelector('#planet3');

let isCenter = false; // 중앙에 있는지 상태 체크

let spinGsap2 = gsap.to(planet2, {
    repeat: -1,
    motionPath: {
        path: '#orangePath',
        align: '#orangePath',
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
        start: 1.5,
        end: 0.5,
    },
    ease: 'none',
    duration: 15,
});

let spinGsap3 = gsap.to(planet3, {
    repeat: -1,
    motionPath: {
        path: '#greenPath',
        align: '#greenPath',
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
        start: 0.5,
        end: 1.5,
    },
    ease: 'none',
    duration: 30,
});

//let toggle = false;
let gsapX;
let gsapY;
let gsapRotate;

planet2.addEventListener('click', function () {
    // if (toggle == !true) {
    //     //spinGsap2.pause();
    //     gsapX = gsap.getProperty(planet2, 'x');
    //     gsapY = gsap.getProperty(planet2, 'y');
    //     gsapRotate = gsap.getProperty(planet2, 'rotation');
    //     console.log(gsapX, gsapY);
    // } else if (toggle == true) {
    // }

    var planetWrap = document.querySelector('.planet_wrap');

    gsap.to(planetWrap, {
        //scale: 5,
        translateZ: '100%',
        ease: 'back.in(1.7)',
        opacity: 0,
        duration: 1,

        onComplete: function () {
            var way = document.querySelector('#planet_way');
            var bg = document.querySelector('.bg');
            console.log(way);

            fetch('/way.html')
                .then((response) => response.text())
                .then((html) => {
                    way.innerHTML = html;

                    var tl = gsap.timeline();
                    tl.from('.pWay', {
                        opacity: 0,
                        scale: 0,
                    }).to(
                        bg,
                        {
                            backgroundPositionX: '100%',
                            filter: 'blur(10px)',
                            ease: 'none',
                            onComplete: function () {
                                gsap.to(
                                    bg,
                                    {
                                        filter: 'blur(0)',
                                    },
                                    '-0.1'
                                );
                            },
                        },
                        '<'
                    );
                })
                .catch((error) => {
                    console.error('Error loading the HTML file:', error);
                });
        },
    });
});

/* 커서 */
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    // 커서 위치 업데이트
    cursor.style.left = e.clientX - cursor.offsetWidth / 2 + 'px';
    cursor.style.top = e.clientY - cursor.offsetHeight / 2 + 'px';
});

// 클릭할 때 커서 애니메이션
document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});
