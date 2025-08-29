import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Filter, Car, Coffee, Briefcase, TrendingUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const mockTransactions = [
  { 
    id: 1, 
    type: "expense", 
    category: "Transporte", 
    amount: -45.50, 
    description: "Gasolina vehículo empresa", 
    date: "2024-08-29", 
    paymentMethod: "Tarjeta Crédito",
    icon: Car 
  },
  { 
    id: 2, 
    type: "income", 
    category: "Ventas", 
    amount: 1200.00, 
    description: "Pago cliente ABC Corp", 
    date: "2024-08-28", 
    paymentMethod: "Transferencia",
    icon: TrendingUp 
  },
  { 
    id: 3, 
    type: "expense", 
    category: "Alimentación", 
    amount: -28.90, 
    description: "Almuerzo reunión equipo", 
    date: "2024-08-28", 
    paymentMethod: "Efectivo",
    icon: Coffee 
  },
  { 
    id: 4, 
    type: "expense", 
    category: "Suministros", 
    amount: -156.00, 
    description: "Material oficina - papelería", 
    date: "2024-08-27", 
    paymentMethod: "Tarjeta Débito",
    icon: Briefcase 
  },
  { 
    id: 5, 
    type: "income", 
    category: "Servicios", 
    amount: 850.00, 
    description: "Consultoría proyecto XYZ", 
    date: "2024-08-26", 
    paymentMethod: "Transferencia",
    icon: TrendingUp 
  },
  { 
    id: 6, 
    type: "expense", 
    category: "Transporte", 
    amount: -85.00, 
    description: "Mantenimiento vehículo", 
    date: "2024-08-25", 
    paymentMethod: "Tarjeta Crédito",
    icon: Car 
  }
];

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || transaction.category === filterCategory;
    const matchesType = !filterType || transaction.type === filterType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const totalExpenses = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-4 pb-20 max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild className="p-2">
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Transacciones</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Gastos</p>
              <p className="text-xl font-bold text-destructive">
                ${totalExpenses.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Ingresos</p>
              <p className="text-xl font-bold text-success">
                ${totalIncome.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar transacciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="expense">Gastos</SelectItem>
                <SelectItem value="income">Ingresos</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas</SelectItem>
                <SelectItem value="Transporte">Transporte</SelectItem>
                <SelectItem value="Alimentación">Alimentación</SelectItem>
                <SelectItem value="Suministros">Suministros</SelectItem>
                <SelectItem value="Ventas">Ventas</SelectItem>
                <SelectItem value="Servicios">Servicios</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Lista de transacciones</h2>
          <Badge variant="secondary">{filteredTransactions.length} resultados</Badge>
        </div>
        
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'income' 
                    ? 'bg-success-light' 
                    : 'bg-red-50'
                }`}>
                  <transaction.icon className={`h-4 w-4 ${
                    transaction.type === 'income'
                      ? 'text-success'
                      : 'text-destructive'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{transaction.date}</span>
                        {transaction.paymentMethod && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{transaction.paymentMethod}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'income'
                          ? 'text-success'
                          : 'text-destructive'
                      }`}>
                        {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No se encontraron transacciones</p>
            <Button variant="link" onClick={() => {
              setSearchTerm("");
              setFilterCategory("");
              setFilterType("");
            }}>
              Limpiar filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Expenses;