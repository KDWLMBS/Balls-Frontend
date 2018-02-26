import service from '@/services/service'

export default {
  register (credentials) {
    return service().post('signup', credentials)
  }
}
