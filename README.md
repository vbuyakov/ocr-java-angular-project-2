# Olympic Games App

A modern Angular 20 application for visualizing Olympic Games statistics. This application displays medal counts by country and provides detailed views for individual countries with interactive charts.

🔗 **Live Demo**: [https://ocr-java-angular-projet-2.buyakov.com](https://ocr-java-angular-projet-2.buyakov.com)  
📦 **Repository**: [GitHub Repository](https://github.com/vbuyakov/ocr-java-angular-project-2)

## Features

- 📊 **Interactive Charts**: Pie chart showing medals per country and line chart showing medal evolution over time
- 🏠 **Home Dashboard**: Overview of all countries with total medal counts
- 🏆 **Country Details**: Detailed view for each country with participation statistics
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices
- ⚡ **Error Handling**: User-friendly error pages for invalid routes and data loading failures
- 🎨 **Modern UI**: Clean and intuitive interface following best practices
- 🔄 **Loading States**: Visual feedback during data fetching
- 🎭 **Route Animations**: Smooth transitions between pages using View Transitions API

## Prerequisites

- Node.js (v24 - specified in `.nvmrc`)
- npm (comes with Node.js)
- nvm (Node Version Manager) - recommended for using the correct Node.js version

## Installation

1. Clone the repository:
```bash
git clone git@github.com:vbuyakov/ocr-java-angular-project-2.git
cd ocr-java-angular-project-2
```

2. Use the correct Node.js version (if using nvm):
```bash
nvm use
```

3. Install dependencies:
```bash
npm ci
```

> **Note**: This project uses `.nvmrc` to specify the Node.js version. We use `npm ci` instead of `npm install` for faster, reliable, reproducible builds.

## Development

### Start Development Server

Run the development server:
```bash
npm start
# or
npx ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Build the project for production:
```bash
npm run build
# or
npx ng build --configuration production
```

The build artifacts will be stored in the `dist/olympic-games-starter/` directory.

### Testing

Run unit tests:
```bash
npm test
# or
npx ng test
```

## Project Structure

```
src/app/
├── components/              # Reusable standalone components
│   ├── all-countries-chart/ # Pie chart component
│   ├── country-medals-chart/# Line chart component
│   ├── header/             # Global header component
│   └── loader/             # Loading spinner component
│
├── pages/                   # Page components (routing)
│   ├── home/               # Home/dashboard page
│   ├── country/            # Country detail page
│   └── not-found/          # 404 error page
│
├── services/                # Business logic services
│   ├── data-service.ts     # HTTP data fetching and business logic
│   ├── logger.ts           # Environment-dependent logging
│   └── prod-logger.ts      # Production logger placeholder
│
├── models/                  # TypeScript interfaces
│   └── olympic-results.ts  # Data models
│
├── app.component.ts         # Root component
└── app.routes.ts            # Route configuration
```

## Architecture

This application follows Angular 20 best practices with:

- **Standalone Components**: All components are standalone for better modularity
- **Service-Based Architecture**: Centralized data management through services
- **Type Safety**: Strong TypeScript typing with interfaces
- **Reactive Programming**: RxJS for async data handling
- **Error Handling**: Comprehensive error handling with user-friendly messages

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Error Handling

The application includes robust error handling:

- **Invalid Routes**: All unknown routes redirect to a user-friendly 404 page
- **Missing Data**: Empty or missing data redirects to the error page
- **HTTP Errors**: Network errors and server errors (500) are caught and handled gracefully
- **Country Not Found**: Invalid country names in URLs redirect to the 404 page

All error messages are user-friendly and avoid exposing technical details.

## Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-width layouts with optimal chart sizing
- **Mobile**: Adaptive layouts with responsive charts using Angular CDK BreakpointObserver
- **Tablet**: Intermediate layouts that scale appropriately

Charts automatically adjust their aspect ratio based on screen size.

## Technologies Used

- **Angular 20**: Modern Angular framework with standalone components
- **TypeScript**: Type-safe JavaScript
- **RxJS**: Reactive programming for async operations
- **Chart.js**: Interactive data visualization
- **Angular CDK**: Layout utilities for responsive design
- **SCSS**: Styling with component-scoped styles
- **View Transitions API**: Native browser animations for route transitions

## Best Practices

This project follows Angular best practices:

✅ Standalone components architecture  
✅ Strong TypeScript typing (no `any` types)  
✅ Separation of concerns (components, services, models)  
✅ Reactive programming with RxJS  
✅ Component-scoped styles (SCSS)  
✅ Proper lifecycle management (chart cleanup in `ngOnDestroy`)  
✅ Environment-dependent configuration  
✅ User-friendly error handling  
✅ Responsive design patterns  
✅ Modern dependency injection with `inject()`  

## Data Source

The application currently uses mock data from `src/assets/mock/olympic.json`. The architecture is designed to easily switch to a real API endpoint by updating the `apiUrl` in environment files.

## Deployment

This project includes a CI/CD pipeline configured with GitHub Actions for automated deployment to production.

### Deployment Pipeline

The deployment workflow (`.github/workflows/deploy.yml`) automatically:

1. **Triggers on push** to `main` or `exercice1` branches
2. **Builds the application** using Node.js 24 and `npm ci`
3. **Creates production build** with Angular production configuration
4. **Deploys via rsync** to the production server using SSH

### Deployment Configuration

The pipeline requires the following GitHub Secrets to be configured:

- `SSH_KEY`: Private SSH key for server access
- `SSH_USER`: SSH username
- `SSH_HOST`: Production server hostname/IP
- `SSH_PORT`: SSH port (optional, defaults to 22)
- `DEPLOY_DIR`: Target directory on the production server

### Manual Deployment

For manual deployment, build the production bundle and deploy it to your server:

```bash
npm run build
# Deploy the contents of dist/olympic-games-starter/ to your server
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code structure and architecture
2. Maintain TypeScript type safety
3. Write tests for new features
4. Ensure responsive design compatibility
5. Follow Angular style guide

## License

This project is part of a learning exercise.

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [RxJS Documentation](https://rxjs.dev)
