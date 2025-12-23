<https://johnkim9887.github.io/typescript_boid/>
The live version is available here!



##Typescript Boids Implementation
Boids is a swarm simulation that simulates the behaviour of birds flocking. 
Each 'Boid' follows simple rule.
1. Separation
   A boid always tries to avoid colliding.
2. Cohesion
   A boid always tries to stay around other boids
3. Allignment
   A boid always tries to fly in the direction of the boids near it.


Furthermore, I added few Hunter Boids(the large, red Boids) , which tries to chase boids, and made boids avoid Hunters.
These simple rules come together to create a emergent behavoiurs.

referenced Article
<https://en.wikipedia.org/wiki/Boids>
