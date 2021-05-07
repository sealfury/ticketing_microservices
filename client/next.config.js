module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300
    return config
  },
}

/*  If changes are not being reflected in browser:
 *
 *  ~~ in terminal run ~~
 *  kubectl get pods
 *  kubectl delete pod [client-depl-***-***]
 *
 *  Client pod is automatically regenerated
 */
