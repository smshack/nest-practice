module.exports = {
    apps: [
      {
        name: 'project',
        script: 'dist/src/main.js',
        interpreter: 'node',
        instances: 1, // 0: all cpu cores
        exec_mode: 'cluster', // cluster or fork
        merge_logs: true, // 클러스터 모드 사용 시 각 클러스터에서 생성되는 로그를 한 파일로 합침.
        autorestart: true, // 프로세스 실패 시 자동으로 재시작
        wait_ready: true, // process.send('ready') 를 받을 때까지 기다림
        listen_timeout: 5000, // ms 단위, process.send('ready') 를 받을 때까지의 대기 시간
        kill_timeout: 5000, // ms 단위
        watch: false, // 파일이 변경되었을 때 재시작
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };