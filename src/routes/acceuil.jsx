import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Loader2, TrendingUp, TrendingDown, Users, AlertCircle, DollarSign, Activity } from "lucide-react";

export default function Acceuil() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats();
  }, []);

   const getStats = async () => {
    try {
      const response = await api.get("dashboard/stats/");
      setStats(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-10 max-sm:px-4 ">
      {/* Header */}
      <div>
        <h1 className="font-bold text-3xl text-blackColor">Tableau de bord</h1>
        <p className="text-textGreyColor font-medium mt-1">
          Vue d'ensemble complète de la situation financière de l'école
        </p>
      </div>

      {/* First Row: Main Financial Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Solde Comptes */}
        <StatCard
          title="Solde total des comptes"
          value={`${stats?.total_soldes?.toLocaleString()} MRU`}
          icon={<DollarSign className="w-5 h-5" />}
          color="text-blue-600"
          delay={0}
        />

        {/* Total Entrées */}
        <StatCard
          title="Total des entrées"
          value={`${stats?.total_entrees?.toLocaleString()} MRU`}
          icon={<TrendingUp className="w-5 h-5" />}
          color="text-green-600"
          delay={0.1}
        />

        {/* Total Sorties */}
        <StatCard
          title="Total des sorties"
          value={`${stats?.total_sorties?.toLocaleString()} MRU`}
          icon={<TrendingDown className="w-5 h-5" />}
          color="text-red-600"
          delay={0.2}
        />

        {/* Étudiants à découvert */}
        <StatCard
          title="Étudiants avec solde négatif"
          value={stats?.etudiants_negatifs}
          icon={<AlertCircle className="w-5 h-5" />}
          color="text-orange-600"
          delay={0.3}
          badge={stats?.etudiants_negatifs > 0 && "Attention"}
        />
      </div>

      {/* Second Row: Student Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total étudiants"
          value={stats?.total_etudiants}
          icon={<Users className="w-5 h-5" />}
          color="text-purple-600"
        />

        <StatCard
          title="Solde positif"
          value={stats?.etudiants_positifs}
          icon={<TrendingUp className="w-5 h-5" />}
          color="text-green-600"
        />

        <StatCard
          title="Solde nul"
          value={stats?.etudiants_zero}
          icon={<Activity className="w-5 h-5" />}
          color="text-gray-600"
        />

        <StatCard
          title="Dette totale étudiants"
          value={`${Math.abs(stats?.total_dette_etudiants || 0).toLocaleString()} MRU`}
          icon={<AlertCircle className="w-5 h-5" />}
          color="text-red-600"
        />
      </div>

      {/* Third Row: Today's Activity */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Transactions aujourd'hui"
          value={stats?.transactions_aujourdhui}
          icon={<Activity className="w-5 h-5" />}
          color="text-indigo-600"
        />

        <StatCard
          title="Entrées du jour"
          value={`${stats?.entrees_aujourdhui?.toLocaleString()} MRU`}
          icon={<TrendingUp className="w-5 h-5" />}
          color="text-green-600"
        />

        <StatCard
          title="Sorties du jour"
          value={`${stats?.sorties_aujourdhui?.toLocaleString()} MRU`}
          icon={<TrendingDown className="w-5 h-5" />}
          color="text-red-600"
        />
      </div>

    

      
    </div>
  );
}

// Reusable animated stat card
function StatCard({ title, value, icon, color, delay = 0, badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-sm">{title}</p>
            <div className={color}>{icon}</div>
          </div>
          <p className="text-2xl font-bold mt-2">
            {value ?? 0}
            {badge && <Badge className="ml-2" variant="destructive">{badge}</Badge>}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}