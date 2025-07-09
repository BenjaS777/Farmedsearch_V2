
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Users, Pill, Search } from 'lucide-react';
import AdminHeader from '@/components/layout/AdminHeader';

const StatCard = ({ title, icon, data, loading }) => (
  <Card className="shadow-soft-lg flex-1 min-w-[280px]">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      {loading ? (
        <div className="h-20 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : (
        <div className="text-2xl font-bold">{data}</div>
      )}
    </CardContent>
  </Card>
);

const TableCard = ({ title, headers, data, loading, dataKeys }) => (
  <Card className="shadow-soft-lg">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {loading ? (
        <div className="h-40 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-muted-foreground">
            <thead className="text-xs text-foreground uppercase bg-accent">
              <tr>
                {headers.map(header => <th key={header} scope="col" className="px-6 py-3">{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? data.map((item, index) => (
                <tr key={index} className="bg-card border-b">
                  {dataKeys.map(key => <td key={key} className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{item[key]}</td>)}
                </tr>
              )) : (
                <tr><td colSpan={headers.length} className="text-center py-8">No hay datos disponibles.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </CardContent>
  </Card>
);

const Admin = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState({ users: [], meds: [], searches: [] });
  const [loading, setLoading] = useState({ users: true, meds: true, searches: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Users stats
        const { data: usersData, error: usersError } = await supabase.from('usuarios_por_plan_stats').select('*');
        if (usersError) throw usersError;
        setStats(prev => ({ ...prev, users: usersData }));
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error al cargar estadísticas de usuarios', description: error.message });
      } finally {
        setLoading(prev => ({ ...prev, users: false }));
      }

      try {
        // Meds stats
        const { data: medsData, error: medsError } = await supabase.from('medicamentos_mas_agregados_stats').select('*');
        if (medsError) throw medsError;
        setStats(prev => ({ ...prev, meds: medsData }));
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error al cargar medicamentos más agregados', description: error.message });
      } finally {
        setLoading(prev => ({ ...prev, meds: false }));
      }

      try {
        // Searches stats
        const { data: searchesData, error: searchesError } = await supabase.from('busquedas_populares_stats').select('*');
        if (searchesError) throw searchesError;
        setStats(prev => ({ ...prev, searches: searchesData }));
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error al cargar búsquedas populares', description: error.message });
      } finally {
        setLoading(prev => ({ ...prev, searches: false }));
      }
    };

    fetchData();
  }, [toast]);

  const totalUsers = stats.users.reduce((acc, plan) => acc + plan.user_count, 0);

  return (
    <>
      <AdminHeader />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold text-text-title mb-8">Panel de Administrador</h1>
        
        <div className="mb-8">
          <Card>
            <CardHeader><CardTitle>Usuarios por Plan</CardTitle></CardHeader>
            <CardContent>
              {loading.users ? (
                 <div className="h-24 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {stats.users.map(plan => (
                    <div key={plan.plan_name} className="p-4 bg-accent rounded-lg">
                      <p className="text-sm text-muted-foreground">{plan.plan_name || 'Sin Plan'}</p>
                      <p className="text-3xl font-bold">{plan.user_count}</p>
                    </div>
                  ))}
                   <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                      <p className="text-sm">Total de Usuarios</p>
                      <p className="text-3xl font-bold">{totalUsers}</p>
                    </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TableCard 
            title="Medicamentos más Agregados"
            headers={["Nombre del Medicamento", "Veces Agregado"]}
            data={stats.meds}
            loading={loading.meds}
            dataKeys={['drug_name', 'times_added']}
          />
          <TableCard 
            title="Búsquedas más Populares"
            headers={["Término de Búsqueda", "Nº de Búsquedas"]}
            data={stats.searches}
            loading={loading.searches}
            dataKeys={['query_text', 'search_count']}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Admin;
