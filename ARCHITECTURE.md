# Architecture de l'application Olympic Games

## Vue d'ensemble

Application Angular 20 développée avec une architecture modulaire basée sur les composants standalone, suivant les bonnes pratiques Angular modernes et les principes de séparation des responsabilités. L'application utilise RxJS pour la programmation réactive, Chart.js pour la visualisation des données, et le View Transitions API pour les animations de navigation.

## Arborescence des dossiers

```
src/app/
├── components/                    # Composants réutilisables standalone
│   ├── all-countries-chart/      # Graphique camembert (Chart.js) - médailles par pays
│   ├── country-medals-chart/      # Graphique linéaire (Chart.js) - évolution des médailles
│   ├── header/                    # En-tête global de l'application
│   └── loader/                    # Composant de chargement (spinner)
│
├── pages/                         # Composants de pages (routing)
│   ├── home/                      # Page d'accueil (dashboard)
│   ├── country/                   # Page détail d'un pays
│   └── not-found/                 # Page 404
│
├── services/                      # Services métier
│   ├── data-service.ts           # Gestion des données HTTP et logique métier
│   ├── logger.ts                 # Service de logging environnement-dépendant
│   └── prod-logger.ts            # Logger de production (placeholder)
│
├── models/                        # Interfaces TypeScript
│   └── olympic-results.ts        # Modèles de données olympiques
│
├── app.component.ts               # Composant racine de l'application
└── app.routes.ts                  # Configuration du routing
```

## Composants et leurs rôles

### Composants Standalone Réutilisables

#### `AllCountriesChartComponent`

- **Rôle** : Affiche un graphique camembert avec Chart.js représentant les médailles par pays
- **Inputs** : `countries` (string[]), `medals` (number[])
- **Responsabilités** :
  - Création et gestion du cycle de vie du graphique Chart.js
  - Gestion responsive avec Angular CDK BreakpointObserver
  - Navigation vers la page de détail d'un pays au clic sur une portion
  - Destruction propre du chart dans `ngOnDestroy()`
- **Autonomie** : Composant standalone importable dans n'importe quel composant

#### `CountryMedalsChartComponent`

- **Rôle** : Affiche un graphique linéaire avec Chart.js représentant l'évolution des médailles par année
- **Inputs** : `years` (number[]), `medals` (number[])
- **Responsabilités** :
  - Création et gestion du cycle de vie du graphique Chart.js
  - Visualisation de l'évolution temporelle des médailles
  - Destruction propre du chart dans `ngOnDestroy()`
- **Autonomie** : Composant standalone importable dans n'importe quel composant

#### `HeaderComponent`

- **Rôle** : En-tête global affiché sur toutes les pages
- **Responsabilité** : Affichage cohérent du titre de l'application
- **Autonomie** : Composant standalone intégré dans `AppComponent`

#### `LoaderComponent`

- **Rôle** : Composant de chargement affiché pendant le chargement des données
- **Responsabilité** : Feedback visuel utilisateur lors des opérations asynchrones (spinner animé)
- **Autonomie** : Composant standalone réutilisable

### Composants de Pages (Routing)

#### `HomeComponent`

- **Rôle** : Page d'accueil / dashboard de l'application
- **Responsabilités** :
  - Charger les données olympiques via `DataService.getResults()`
  - Calculer les statistiques globales (nombre de pays, nombre de JOs)
  - Préparer les données pour le graphique camembert (pays et médailles)
  - Gérer l'état de chargement avec le composant `Loader`
- **Services utilisés** : `DataService`
- **Composants utilisés** : `Loader`, `AllCountriesChart`

#### `CountryComponent`

- **Rôle** : Page de détail d'un pays spécifique
- **Responsabilités** :
  - Récupérer le nom du pays depuis les paramètres de route
  - Charger les données du pays via `DataService.getCountryResult()`
  - Calculer les statistiques du pays (total médailles, athlètes, participations)
  - Préparer les données pour le graphique linéaire (années et médailles)
  - Gérer la navigation vers `/not-found` en cas d'erreur ou de pays introuvable
  - Afficher un breadcrumb avec navigation vers l'accueil
- **Services utilisés** : `DataService`, `ActivatedRoute`, `Router`
- **Composants utilisés** : `Loader`, `CountryMedalsChart`
- **Gestion d'erreurs** : Utilisation de RxJS `switchMap`, `catchError`, `EMPTY` pour une gestion robuste des erreurs

#### `NotFoundComponent`

- **Rôle** : Page 404 pour les routes non trouvées
- **Responsabilités** : Afficher un message d'erreur et permettre le retour à l'accueil
- **Services utilisés** : `Router` (via `RouterLink`)

## Services et leurs rôles

### `DataService`

**Rôle principal** : Service central pour la gestion des données olympiques via HTTP et la logique métier

**Responsabilités** :

1. **Gestion des données HTTP** :
   - `getResults()` : Récupère toutes les données olympiques depuis l'API
   - `getCountryResult(countryName: string)` : Récupère les données d'un pays spécifique
   - Simulation d'un délai serveur (1 seconde) pour tester les états de chargement
   - Gestion des erreurs HTTP avec logging

2. **Logique métier** :
   - Filtrage des données par pays
   - Transformation des données pour les composants

**Avantages** :
- Centralisation de toute la logique de récupération des données
- Réutilisabilité dans tous les composants
- Gestion d'erreurs centralisée
- Typage strict avec les interfaces TypeScript

### `Logger`

**Rôle principal** : Service de logging environnement-dépendant

**Responsabilités** :

1. **Logging conditionnel** :
   - En développement : logs vers `console.*`
   - En production : délégation vers `ProdLogger` (placeholder pour intégration avec outils externes)

2. **Méthodes disponibles** :
   - `log()`, `error()`, `warn()`, `info()`, `debug()`

**Avantages** :
- Séparation claire entre développement et production
- Point d'extension pour intégration avec des services de logging externes
- Utilisation cohérente dans toute l'application

### `ProdLogger`

**Rôle** : Placeholder pour le logging en production

**Responsabilité** : Point d'extension pour intégration future avec des outils de logging externes (ex: Sentry, LogRocket, etc.)

## Modèles de données

### `Olympic`

```typescript
interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}
```

### `Participation`

```typescript
interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}
```

### `OlympicResults`

```typescript
type OlympicResults = Olympic[];
```

**Typage strict** : Tous les types `any` ont été remplacés par ces interfaces typées, garantissant la sécurité de type à la compilation.

## Routing et Navigation

### Configuration des routes

L'application utilise le routing Angular avec les routes suivantes :

- `/` : Page d'accueil (`HomeComponent`)
- `/country/:countryName` : Page de détail d'un pays (`CountryComponent`)
- `/not-found` : Page 404 (`NotFoundComponent`)
- `**` : Redirection vers `/not-found` pour toutes les routes non définies

### View Transitions API

L'application utilise `withViewTransitions()` d'Angular 20 pour des animations de transition fluides entre les pages, exploitant le View Transitions API natif du navigateur.

## Préparation à une connexion back-end/API

L'architecture actuelle est déjà conçue pour faciliter l'intégration d'une API REST :

### 1. Séparation des responsabilités

- **Service HTTP isolé** : `DataService` utilise déjà `HttpClient` et peut facilement être adapté pour différentes URLs d'API
- **Composants découplés** : Les composants ne connaissent que les services, pas la source des données
- **Configuration par environnement** : Les URLs d'API sont configurées dans `environment.ts` et `environment.prod.ts`

### 2. Migration vers API REST facilitée

```typescript
// Actuellement : données depuis assets/mock/olympic.json
private apiUrl = environment.apiUrl; // './assets/mock/olympic.json'

// Futur : URL d'API REST
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com/olympics'
};
```

### 3. Patterns déjà en place

- **Observables** : Toute la communication utilise RxJS (async par défaut)
- **Gestion d'erreurs** : Structure `catchError` et redirection vers `/not-found` déjà implémentée
- **Typage** : Modèles TypeScript prêts pour la validation des réponses API
- **Simulation de latence** : Délai de 1 seconde déjà en place pour tester les états de chargement

### 4. Points d'extension futurs

- **Intercepteurs HTTP** : Gestion centralisée des tokens, erreurs, loading global
- **Environment** : Configuration des URLs d'API par environnement (déjà en place)
- **Error handling** : Service dédié aux erreurs HTTP (peut être étendu)
- **Loading states** : Service global pour gérer les états de chargement (actuellement géré par composant)
- **Cache** : Mise en cache des données avec `BehaviorSubject` ou `shareReplay()`
- **Retry logic** : Logique de retry pour les requêtes HTTP échouées

## Bonnes pratiques appliquées

✅ **Composants standalone** : Architecture moderne Angular 20, réutilisables et testables indépendamment  
✅ **Typage strict** : Aucun `any`, interfaces TypeScript partout  
✅ **Séparation présentation/logique** : Composants = vue, Services = logique métier  
✅ **Reactive programming** : Utilisation d'Observables et RxJS (`switchMap`, `catchError`, `EMPTY`)  
✅ **DRY (Don't Repeat Yourself)** : Code mutualisé dans les services  
✅ **Single Responsibility** : Chaque composant/service a une responsabilité claire  
✅ **Encapsulation des styles** : SCSS scopé par composant  
✅ **Gestion mémoire** : Destruction des charts dans `ngOnDestroy()`  
✅ **Gestion d'erreurs robuste** : Redirection vers `/not-found` pour les routes invalides  
✅ **Responsive design** : Utilisation d'Angular CDK BreakpointObserver pour l'adaptation mobile  
✅ **View Transitions** : Animations de navigation fluides avec l'API native du navigateur  
✅ **Dependency Injection moderne** : Utilisation de `inject()` au lieu de l'injection par constructeur  
✅ **Logging environnement-dépendant** : Séparation claire entre développement et production

## Architecture modulaire

L'application est prête pour une évolution en architecture modulaire :

- Les composants standalone peuvent être regroupés en feature modules si nécessaire
- Les services sont `providedIn: 'root'` (singletons)
- Le routing est séparé (`app.routes.ts`)
- Les modèles peuvent devenir une librairie partagée (`@shared/models`)

Cette architecture garantit la maintenabilité, la testabilité et l'évolutivité du code, tout en suivant les standards modernes d'Angular 20.

