import User from '../models/User';
import Notification from '../schemas/NotificationSchema';

class NotificationController{
    async index(req, res){
        const checkIsProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if(!checkIsProvider){
            return res
                .status(401)
                .json({ error: 'Only provider can load notification' });
        }

        const notifications = await Notification.find({
            user: req.userId
        }).sort('createdAt').limit(20);

        return res.json(notifications);
    }

    async update(req, res){
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        return res.json(notification);
    }
}

export default new NotificationController();
