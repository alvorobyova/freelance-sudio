const host = 'http://localhost:3000';

export const config = {
  api: host + '/api',
  host: host,
  freelancerLevels: {
    junior: 'junior',
    middle: 'middle',
    senior: 'senior',
  },
  orderStatus: {
    new: 'new',
    confirmed: 'confirmed',
    success: 'success',
    canceled: 'canceled',
  }
}