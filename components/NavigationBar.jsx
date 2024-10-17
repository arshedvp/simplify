'use client'
import React, { useState } from 'react';
import { Phone, MessageCircle, Home, User, Settings, ChevronRight, ArrowLeft, Bell } from 'lucide-react';

const NavigationBar = ({ activePage }) => (
    <nav className="flex justify-around bg-white rounded-full py-2 shadow-lg">
      <button className="p-2">
        <Home className={activePage === 'home' ? "text-blue-500" : "text-gray-800"} />
      </button>
      <button className="p-2">
        <Phone className={activePage === 'calls' ? "text-blue-500" : "text-gray-800"} />
      </button>
      <button className="p-2">
        <MessageCircle className={activePage === 'chat' ? "text-blue-500" : "text-gray-800"} />
      </button>
      <button className="p-2">
        <User className={activePage === 'profile' ? "text-blue-500" : "text-gray-800"} />
      </button>
      <button className="p-2">
        <Settings className={activePage === 'settings' ? "text-blue-500" : "text-gray-800"} />
      </button>
    </nav>
  );
  
  const PageHeader = ({ title, hasBack = false }) => (
    <div className="flex items-center mb-6">
      {hasBack && (
        <button className="mr-4">
          <ArrowLeft className="text-gray-800" />
        </button>
      )}
      <h2 className="text-xl font-bold text-gray-700">{title}</h2>
    </div>
  );
  