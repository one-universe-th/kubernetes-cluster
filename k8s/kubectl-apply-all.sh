cd backend

kubectl apply -f backend-all.yaml

cd ..

cd frontend

kubectl apply -f frontend-all.yaml

cd ..

cd mongo

kubectl apply -f mongodb-all.yaml

cd ..

cd redis

kubectl apply -f redis-all.yaml
