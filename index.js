require('shelljs/global')
const {Service, Failure, Success, fetch} = require('pico')

let shell =(sh_script) => {
  try {
    let result = exec(sh_script.split("\n").map(item => item.trim()).join("\n"))
    if(result.code !== 0) { 
      return Failure.of(result.stderr) 
    }
    return Success.of(result.stdout)
  } catch (error) {
    return Failure.of(error.message)
  }
}

shell(`
  mkdir ~/.config/;
  cat > clever-cloud << EOF
  {"token":"${process.env.CC_TOKEN}","secret":"${process.env.CC_SECRET}"}
  EOF  
`)

let port = process.env.PORT || 8080;

let deployService = new Service({})

let checkToken = token => 
  token == process.env.DEPLOY_TOKEN
  ? Success.of(token)
  : Failure.of("😡 Bad token")

deployService.post({uri:`/api/deploy`, f: (request, response) => {
  let data = request.body
  let token = request.headers['token']

  checkToken(token).when({
    Failure: err => response.sendJson({message: "😡", error: err}),
    Success: () => {
      shell(data.shell).when({
        Failure: err => response.sendJson({message: "😡", error: err}),
        Success: res => response.sendJson({message: "😃", result: res})
      })
    }
  })
}})

deployService.get({uri:`/`, f: (request, response) => {
  response.sendJson({message: "Hey 👋 How are you doing?"})
}})

deployService.start({port: port}, res => {
  res.when({
    Failure: error => console.log("😡 Houston? We have a problem!"),
    Success: port => {
      console.log(`🌍 deploy service is listening on ${port}`)
      shell(`
        clever --version
      `)
    }
  })
})
