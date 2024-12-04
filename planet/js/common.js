const mission = document.querySelector('.mission');
const way = document.querySelector('.way');
const phil = document.querySelector('.phil');
const circles = gsap.utils.toArray('.circle');
let reverseKey = 'off';

function showMission() {
  //최초 진입시 보여질 애니메이션
  const tl = gsap.timeline();

  const planets = gsap.utils.toArray('.planet');

  tl.set(circles, {
    scale: 0.1,
  })
    .set(planets, {
      xPercent: gsap.utils.wrap([0, 270, -180]),
      yPercent: gsap.utils.wrap([0, 75, -80]),
      scale: 0.8,
    })
    .to(planets, {
      scale: 1,
      //ease: 'bounce.in',
    })
    .to(
      planets,
      {
        xPercent: 0,
        yPercent: 0,
        stagger: {
          each: 0.1,
        },
      },
      '<'
    )
    .to(
      circles,
      {
        scale: 1,
        stagger: {
          each: 0.1,
        },
      },
      '<'
    );
}

showMission();

mission.addEventListener('click', function () {
  missionAniTimeline.play();
});
way.addEventListener('click', function () {
  wayAniTimeline.play();
});

function missionAni() {
  //미션행성 클릭시 애니메이션
  const tl = gsap.timeline({ paused: true }); // timeline을 paused로 설정

  tl.to('.way', {
    x: '-500%',
    y: '500%',
    z: '1000px',
    duration: 1,
    ease: 'power3.inOut',
  })
    .to(
      '.phil',
      {
        x: '500%',
        y: '500%',
        z: '1000px',
        duration: 1,
        ease: 'elastic.out(1,0.9)',
      },
      '<'
    )
    .to(
      circles,
      {
        scale: 5,
        opacity: 0,
        duration: 3,
        ease: 'elastic.out(1,0.9)',
      },
      '<'
    )
    .to(
      '.mission',
      {
        delay: 0.1,
        z: '4000px',
        yPercent: 50,
        duration: 3,
        ease: 'elastic.out(1,0.9)',
      },
      '<'
    )
    .to(
      '.mission',
      {
        backgroundColor: '#eee',

        onComplete: () => {
          console.log('complete');
          reverseKey = 'mission';
        },
        onReverseComplete: () => {
          console.log('ReverseComplete');
          reverseKey = 'off';
        },
      },
      '<'
    );

  return tl;
}

function wayAni() {
  const wayTl = gsap.timeline({ paused: true });
  wayTl
    .to('.way', {
      left: '50%',
      top: '50%',
      x: '-50%',
      y: '-50%',
    })
    .to(
      '.mission',
      {
        xPercent: 500,
        yPercent: 500,
      },
      '<'
    )
    .to(
      '.phil',
      {
        xPercent: 500,

        onComplete: () => {
          reverseKey = 'way';
        },
        onReverseComplete: () => {
          reverseKey = 'off';
        },
      },
      '<'
    );

  return wayTl;
}
const wayAniTimeline = wayAni();
const missionAniTimeline = missionAni();

const reverseBtn = document.querySelector('#aniReverse');

reverseBtn.addEventListener('click', function () {
  switch (reverseKey) {
    case 'off':
      console.log('off');
      break;

    case 'mission':
      missionAniTimeline.reverse();
      break;

    case 'way':
      wayAniTimeline.reverse();
      break;

    default:
      break;
  }

  //console.log('리버스');
  missionAniTimeline.reverse();
});
