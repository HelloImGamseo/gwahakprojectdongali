function runSimulation() {
  const inputJoule = parseFloat(document.getElementById("heatInput").value);
  if (isNaN(inputJoule) || inputJoule <= 0) {
    alert("양수의 열에너지를 입력해 주세요.");
    return;
  }

  
  if (inputJoule > 70000) {
    alert("최대 입력 가능한 열에너지는 70,000줄입니다!");
    return;
  }
  const carnoEfficiency = 0.8;
  const carEfficiency = 0.25;
  const metersPerJoule = 0.01;

  const carnoWork = inputJoule * carnoEfficiency;
  const carWork = inputJoule * carEfficiency;

  const carnoDistance = carnoWork * metersPerJoule;
  const carDistance = carWork * metersPerJoule;

  const carnoDot = document.getElementById("carno");
  const carDot = document.getElementById("car");
  carnoDot.style.transform = `translateX(${carnoDistance}px)`;
  carDot.style.transform = `translateX(${carDistance}px)`;

  const resultText = document.getElementById("resultText");
  resultText.innerHTML = `
    🔵 카르노 기관 이동 거리: <b>${carnoDistance.toFixed(2)} m</b><br>
    🔴 자동차 엔진 이동 거리: <b>${carDistance.toFixed(2)} m</b>
  `;

  const time = 10;
  const carnoSpeed = carnoDistance / time;
  const carSpeed = carDistance / time;

  const ctx = document.getElementById('velocityChart').getContext('2d');
  if (window.myChart) {
    window.myChart.destroy();
  }
  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [0, time],
      datasets: [
        {
          label: '카르노 기관 속력 (m/s)',
          data: [carnoSpeed, carnoSpeed],
          borderColor: 'blue',
          fill: false
        },
        {
          label: '자동차 엔진 속력 (m/s)',
          data: [carSpeed, carSpeed],
          borderColor: 'red',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          title: {
            display: true,
            text: '속력 (m/s)'
          }
        },
        x: {
          title: {
            display: true,
            text: '시간 (s)'
          }
        }
      }
    }
  });
}
