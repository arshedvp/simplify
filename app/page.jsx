import React from 'react';
import { ArrowRight, Signal, Shield, Settings } from 'lucide-react';

const Hero = () => {
  const features = [
    {
      icon: <Signal className="w-6 h-6" />,
      title: "Network Monitoring",
      description: "Real-time visibility into network performance"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Management",
      description: "Advanced security protocols and threat detection"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Resource Optimization",
      description: "Efficient allocation of telecommunication resources"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            
            <span className="block text-blue-600">Simplify</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Streamline your telecommunications infrastructure with our comprehensive management platform. Monitor, optimize, and secure your network with ease.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;