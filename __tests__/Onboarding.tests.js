import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Onboarding from '../src/app/onboarding/page';
import Step from '../src/app/onboarding/components/Step';
import NextButton from '../src/app/onboarding/components/NextButton';
import CopyButton from '../src/app/onboarding/components/CopyButton';
import CodeBox from '../src/app/onboarding/components/CodeBox';

jest.mock('../src/app/onboarding/components/Step', () => jest.fn(() => <div>Step Component</div>));
jest.mock('../src/app/onboarding/components/NextButton', () => jest.fn(() => <div>Next Button</div>));
jest.mock('../src/app/components/withAuth', () => (Component) => (props) => <Component {...props} />);
jest.mock('../src/app/onboarding/components/CodeBox', () => jest.fn(() => <div>CodeBox Component</div>));

describe('Onboarding Page', () => {
    const mockOnboardingSteps = [
      {
        stepNumber: 1,
        title: "Install and Configure Next.js Bundle Analyzer",
        description: "NPM install Next.js Bundle Analyzer:",
        code: `npm install @next/bundle-analyzer`,
        language: "terminal",
        api: false,
      },
      {
        stepNumber: "",
        title: "",
        description: "Configure next.config.mjs file:",
        code: `import pkg from '@next/bundle-analyzer';
  const withBundleAnalyzer = pkg({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {};

export default withBundleAnalyzer(nextConfig);`,
        language: "next.config.mjs",
        api: false,
      },
      {
        stepNumber: 2,
        title: "Install and configure NextLevelPackage",
        description: "NPM Install NextLevelPackage:",
        code: `npm install nextlevelpackage`,
        language: "terminal",
        api: false,
      },
      {
        stepNumber: "",
        title: "",
        description: "Import NextLevelPackage in layout.js:",
        code: `import NextWebVitals from 'nextlevelpackage';`,
        language: "layout.js",
        api: false,
      },
      {
        stepNumber: "",
        title: "",
        description: "Add NextWebVitals component in RootLayout body:",
        code: `export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextWebVitals />
        {children}
      </body>
    </html>
  );
}`,
        language: "layout.js",
        api: false,
      },
      {
        stepNumber: 3,
        title: 'Configure Environment Variables',
        description: 'Add the following line to your .env.local file:',
        code: `NEXT_PUBLIC_API_KEY=<your-api-key>`,
        language: '.env.local',
        api: true,
      },
      {
        stepNumber: 4,
        title: "Add Build Script to package.json",
        description: "Add the following script to your package.json:",
        code: `"scripts": {
  "nextlevelbuild": "node ./node_modules/nextlevelpackage/cli.js"
}`,
        language: "terminal",
        api: false,
      },
      {
        stepNumber: '',
        title: '',
        description: 'Run this build script instead of \'npm next build\' to track metrics in the dashboard:',
        code: `npm run nextlevelbuild`,
        language: "terminal",
        api: false,
      },
      ];
      const mockProps = {
        searchParams: {
            username: 'testuser',
        },
    };
    beforeEach(() => {
        Step.mockClear();
        NextButton.mockClear();
    });

    test('renders onboarding page with steps', () => {
        render(<Onboarding {...mockProps} />);

        expect(screen.getByText('NextLevel Onboarding Instructions')).toBeInTheDocument();
        expect(Step).toHaveBeenCalledTimes(mockOnboardingSteps.length);
    });

    test('renders Step components with correct props', () => {
        render(<Onboarding {...mockProps} />);

        mockOnboardingSteps.forEach((step, index) => {
            expect(Step).toHaveBeenNthCalledWith(
                index + 1,
                expect.objectContaining({
                    className: "step",
                    stepNumber: step.stepNumber,
                    title: step.title,
                    description: step.description,
                    code: step.code,
                    language: step.language,
                    api: step.api,
                    username: 'testuser',
                }),
                {}
            );
        });
    });

    test('renders NextButton with correct props', () => {
        render(<Onboarding {...mockProps} />);
        expect(screen.getByText('Next Button')).toBeInTheDocument();
        expect(NextButton).toHaveBeenCalledWith(expect.objectContaining({ username: 'testuser' }), {});
    });
    jest.unmock('../src/app/onboarding/components/Step');
});

describe('Step Component', () => {
    const mockStepProps = {
        stepNumber: 1,
        title: 'Test Step',
        description: 'Test Description',
        code: 'test code',
        language: 'test language',
        api: false,
        username: 'testuser',
    };
    test('renders Step component', () => {
        render(<Step {...mockStepProps} />);
        expect(screen.getByText('Step Component')).toBeInTheDocument();
    });
});

describe('CopyButton Component', () => {
    test('renders CopyButton component', () => {
        render(<CopyButton text="test text" />);
        expect(screen.getByText('Copy')).toBeInTheDocument();
    });

    test('copies text to clipboard on click', async () => {
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn().mockResolvedValue(),
            },
        });

        render(<CopyButton text="test text" />);
        fireEvent.click(screen.getByText('Copy'));

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
        expect(await screen.findByText('Copied!')).toBeInTheDocument();
    });
});



// jest.mock('../src/app/onboarding/components/Step', () => jest.fn(() => <div>Step Component</div>));
// jest.mock('../src/app/onboarding/components/NextButton', () => jest.fn(() => <div>Next Button</div>));
// jest.mock('../src/app/components/withAuth', () => (Component) => (props) => <Component {...props} />);
// jest.mock('../src/app/onboarding/components/CodeBox', () => jest.fn(() => <div>CodeBox Component</div>));

// describe('Onboarding Page', () => {
//     const mockOnboardingSteps = [
//       {
//         stepNumber: 1,
//         title: "Install and Configure Next.js Bundle Analyzer",
//         description: "NPM install Next.js Bundle Analyzer:",
//         code: `npm install @next/bundle-analyzer`,
//         language: "terminal",
//         api: false,
//       },
//       {
//         stepNumber: "",
//         title: "",
//         description: "Configure next.config.mjs file:",
//         code: `import pkg from '@next/bundle-analyzer';
//   const withBundleAnalyzer = pkg({
//   enabled: process.env.ANALYZE === 'true',
// });

// const nextConfig = {};

// export default withBundleAnalyzer(nextConfig);`,
//         language: "next.config.mjs",
//         api: false,
//       },
//       {
//         stepNumber: 2,
//         title: "Install and configure NextLevelPackage",
//         description: "NPM Install NextLevelPackage:",
//         code: `npm install nextlevelpackage`,
//         language: "terminal",
//         api: false,
//       },
//       {
//         stepNumber: "",
//         title: "",
//         description: "Import NextLevelPackage in layout.js:",
//         code: `import NextWebVitals from 'nextlevelpackage';`,
//         language: "layout.js",
//         api: false,
//       },
//       {
//         stepNumber: "",
//         title: "",
//         description: "Add NextWebVitals component in RootLayout body:",
//         code: `export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <NextWebVitals />
//         {children}
//       </body>
//     </html>
//   );
// }`,
//         language: "layout.js",
//         api: false,
//       },
//       {
//         stepNumber: 3,
//         title: 'Configure Environment Variables',
//         description: 'Add the following line to your .env.local file:',
//         code: `NEXT_PUBLIC_API_KEY=<your-api-key>`,
//         language: '.env.local',
//         api: true,
//       },
//       {
//         stepNumber: 4,
//         title: "Add Build Script to package.json",
//         description: "Add the following script to your package.json:",
//         code: `"scripts": {
//   "nextlevelbuild": "node ./node_modules/nextlevelpackage/cli.js"
// }`,
//         language: "terminal",
//         api: false,
//       },
//       {
//         stepNumber: '',
//         title: '',
//         description: 'Run this build script instead of \'npm next build\' to track metrics in the dashboard:',
//         code: `npm run nextlevelbuild`,
//         language: "terminal",
//         api: false,
//       },
//       ];
//       const mockProps = {
//         searchParams: {
//             username: 'testuser',
//         },
//     };

//     beforeEach(() => {
//         Step.mockClear();
//         NextButton.mockClear();
//     });

//     test('renders onboarding page with steps', () => {
//         render(<Onboarding {...mockProps} />);

//         expect(screen.getByText('NextLevel Onboarding Instructions')).toBeInTheDocument();
//         expect(Step).toHaveBeenCalledTimes(mockOnboardingSteps.length);
//     });

//     test('renders Step components with correct props', () => {
//         render(<Onboarding {...mockProps} />);

//         mockOnboardingSteps.forEach((step, index) => {
//             expect(Step).toHaveBeenNthCalledWith(
//                 index + 1,
//                 expect.objectContaining({
//                     className: "step",
//                     stepNumber: step.stepNumber,
//                     title: step.title,
//                     description: step.description,
//                     code: step.code,
//                     language: step.language,
//                     api: step.api,
//                     username: 'testuser',
//                 }),
//                 {}
//             );
//         });
//     });

//     test('renders NextButton with correct props', () => {
//         render(<Onboarding {...mockProps} />);
//         expect(screen.getByText('Next Button')).toBeInTheDocument();
//         expect(NextButton).toHaveBeenCalledWith(expect.objectContaining({ username: 'testuser' }), {});
//     });
//     //fails
//     test('fetches API key if step requires it', async () => {
//         global.fetch = jest.fn(() =>
//             Promise.resolve({
//                 ok: true,
//                 json: () => Promise.resolve({ APIkey: 'test-api-key' }),
//             })
//         );

//         render(<Onboarding {...mockProps} />);
//         await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/onboarding/api?username=testuser'));

//         expect(Step).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 username: 'testuser',
//             }),
//             {}
//         );
//     });
  
// });

// describe('Step Component', () => {
//     const mockStepProps = {
//         stepNumber: 1,
//         title: 'Test Step',
//         description: 'Test Description',
//         code: 'test code',
//         language: 'test language',
//         api: false,
//         username: 'testuser',
//     };
//     //fails
//     test('renders Step component', () => {
//         render(<Step {...mockStepProps} />);
//         expect(screen.getByText('Step Component')).toBeInTheDocument();
//     });
//     //fails
//     test('fetches API key if api is true', async () => {
//       global.fetch = jest.fn(() =>
//             Promise.resolve({
//                 ok: true,
//                 json: () => Promise.resolve({ APIkey: 'test-api-key' }),
//             })
//         );

//         render(<Step {...mockStepProps} />);

//         await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/onboarding/api?username=testuser'));
//         expect(CodeBox).toHaveBeenCalledWith(expect.objectContaining({ fileName: 'API Key', formattedCode: 'test-api-key' }), expect.any(Object));
//     });
// });

// describe('CopyButton Component', () => {
//     test('renders CopyButton component', () => {
//         render(<CopyButton text="test text" />);
//         expect(screen.getByText('Copy')).toBeInTheDocument();
//     });

//     test('copies text to clipboard on click', async () => {
//         Object.assign(navigator, {
//             clipboard: {
//                 writeText: jest.fn().mockResolvedValue(),
//             },
//         });

//         render(<CopyButton text="test text" />);
//         fireEvent.click(screen.getByText('Copy'));

//         expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
//         expect(await screen.findByText('Copied!')).toBeInTheDocument();
//     });
// });