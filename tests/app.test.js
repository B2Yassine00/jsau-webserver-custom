const request = require('supertest');
const app = require('../app'); // Import app without starting the server

let server;

beforeAll(() => {
  server = app.listen(4001);
});

afterAll((done) => {
  server.close(done); // Ensure the server closes properly
});

describe('Web Server Tests', () => {
  it('should load the /recettes page', async () => {
    const response = await request(server).get('/recettes');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Recettes'); // Check for specific content on the page
  });

  it('should search recettes with a query', async () => {
    const response = await request(server).get('/recettes?search=test');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Recettes'); // Ensure the search does not break the page
  });

  it('should load the /favoris page', async () => {
    const response = await request(server).get('/favorites');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Your Favorites'); // Check for specific content on the page
  });

  it('should display details for a recette', async () => {
    const response = await request(server).get('/recette/1'); // Assuming 1 is a valid recette ID
    expect(response.status).toBe(200);
    expect(response.text).toContain('Content:'); // Check for specific content in the recette details
  });

  
});
