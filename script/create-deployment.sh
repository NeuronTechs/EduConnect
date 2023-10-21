echo "Deploying secondary MySQL cluster"
echo "Creating namespace educonnect for secondary cluster use"
kubectl create namespace educonnect

kubectl apply -n educonnect-web -f secret.yaml 
kubectl apply -n educonnect-web -f configmap.yaml

echo "..."
echo "Create backend statefulset in namespace educonnect-web for secondary cluster use"
kubectl apply -n educonnect-web -f backend-deployment.yaml
kubectl apply -n educonnect-web -f backend-service.yaml


echo "..."
echo "Create frontend statefulset in namespace educonnect-web for secondary cluster use"
kubectl apply -n educonnect-web -f frontend-deployment.yaml
kubectl apply -n educonnect-web -f frontend-service.yaml
