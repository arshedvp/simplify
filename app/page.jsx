import React from 'react';
import { ArrowRight, Signal, Shield, Settings } from 'lucide-react';
import Link from 'next/link';
import { Dashboard } from '../components/Dashboard';

const Hero = () => {
  const features = [
    {
      icon: <Signal className="w-6 h-6" />,
      title: "Network Monitoring",
      description: "Real-time visibility into network performance and health metrics with instant alerts and detailed analytics."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Management",
      description: "Enterprise-grade security protocols and advanced threat detection to keep your network protected 24/7."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Resource Optimization",
      description: "Smart allocation of telecommunications resources to maximize efficiency and reduce operational costs."
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-32 -top-32 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-50 rounded-full opacity-50 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
              Launching Soon
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Manage Your Network
            <span className="block text-blue-600 mt-2">With Confidence</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Streamline your telecommunications infrastructure with our comprehensive management platform. Monitor, optimize, and secure your network with enterprise-grade tools.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Link 
              href="/signin" 
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-blue-600 border-2 border-blue-600 flex items-center justify-center gap-2 hover:bg-blue-50 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1 group"
            >
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
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